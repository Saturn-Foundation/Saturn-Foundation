"use client"

const abi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_worldId",
          "type": "address",
          "internalType": "contract IWorldID"
        },
        {
          "name": "_appId",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_actionId",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "verifyAndExecute",
      "inputs": [
        {
          "name": "signal",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "root",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "nullifierHash",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "proof",
          "type": "uint256[8]",
          "internalType": "uint256[8]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Verified",
      "inputs": [
        {
          "name": "nullifierHash",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "DuplicateNullifier",
      "inputs": [
        {
          "name": "nullifierHash",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    }
  ]


import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IDKitWidget, ISuccessResult, useIDKit, VerificationLevel } from '@worldcoin/idkit'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, type BaseError } from 'wagmi'
import { decodeAbiParameters, parseAbiParameters } from 'viem'
import { useState } from 'react'

export default function Exp() {
	const account = useAccount()
	const { setOpen } = useIDKit()
	const [done, setDone] = useState(false)
	const { data: hash, isPending, error, writeContractAsync } = useWriteContract()
	const { isLoading: isConfirming, isSuccess: isConfirmed } = 
		useWaitForTransactionReceipt({
			hash,
		}) 

	const submitTx = async (proof: ISuccessResult) => {
		try {
			await writeContractAsync({
				address: '0xd174f91A7D50037173a95fC32362A9c63CbEb192',
				account: account.address!,
				abi,
				functionName: 'verifyAndExecute',
				args: [
					account.address!,
					BigInt(proof!.merkle_root),
					BigInt(proof!.nullifier_hash),
					decodeAbiParameters(
						parseAbiParameters('uint256[8]'),
						proof!.proof as `0x${string}`
					)[0],
				],
			})
			setDone(true)
		} catch (error) {throw new Error((error as BaseError).shortMessage)}
	}

	return (
		<div>
			<ConnectButton />
			{account.isConnected && (<>
				<IDKitWidget
                    verification_level={VerificationLevel.Orb}
					app_id='app_f914e501cbf1c0e8a8d2cec3e2c617b2'
					action='verify-human'
					signal={account.address}
					onSuccess={submitTx}
					autoClose
				/>

				{!done && <button onClick={() => setOpen(true)}>{!hash && (isPending ? "Pending, please check your wallet..." : "Verify and Execute Transaction")}</button>}

				{hash && <p>Transaction Hash: {hash}</p>}
				{isConfirming && <p>Waiting for confirmation...</p>} 
				{isConfirmed && <p>Transaction confirmed.</p>}
				{error && <p>Error: {(error as BaseError).message}</p>}
			</>)}
		</div>
	)
}