import { useMutation } from "@tanstack/react-query";
import { useEthersSigner } from "@/hooks/useEthers";
import { useState } from "react";
import { useConfetti } from "@/hooks/useConfetti";
import { useNetwork } from "@/hooks/useNetwork";
import { Synapse, TOKENS, CONTRACT_ADDRESSES } from "@filoz/synapse-sdk";
import { DATA_SET_CREATION_FEE, MAX_UINT256, getDataset } from "@/utils";
import { useAccount } from "wagmi";

/**
 * Hook to handle payment for storage
 * @param lockup - The lockup amount to be used for the storage
 * @param epochRate - The epoch rate to be used for the storage
 * @param depositAmount - The deposit amount to be used for the storage
 * @notice LockUp is the accoumulated amount of USDFC that the user has locked up for Storing data over time.
 * It is different from the depositAmount. Which is the amount needed to pay for more storage if required.
 * @returns Mutation and status
 */
export const usePayment = () => {
  const signer = useEthersSigner();
  const [status, setStatus] = useState<string>("");
  const { triggerConfetti } = useConfetti();
  const { data: network } = useNetwork();
  const { address } = useAccount();
  const mutation = useMutation({
    mutationFn: async ({
      lockupAllowance,
      epochRateAllowance,
      depositAmount,
    }: {
      lockupAllowance: bigint;
      epochRateAllowance: bigint;
      depositAmount: bigint;
    }) => {
      if (!signer) throw new Error("Signer not found");
      if (!network) throw new Error("Network not found");
      if (!address) throw new Error("Address not found");
      const paymentsAddress = CONTRACT_ADDRESSES.PAYMENTS[network];

      setStatus("🔄 Preparing transaction...");
      const synapse = await Synapse.create({
        signer,
        disableNonceManager: false,
      });

      const { dataset } = await getDataset(synapse, address);

      const hasDataset = !!dataset;

      const fee = hasDataset ? 0n : DATA_SET_CREATION_FEE;

      const amount = depositAmount + fee;

      const allowance = await synapse.payments.allowance(
        TOKENS.USDFC,
        paymentsAddress
      );

      const balance = await synapse.payments.walletBalance(TOKENS.USDFC);

      if (balance < amount) {
        throw new Error("Insufficient USDFC balance");
      }

      if (allowance < MAX_UINT256 / 2n) {
        setStatus("💰 Approving USDFC to cover storage costs...");
        const transaction = await synapse.payments.approve(
          TOKENS.USDFC,
          paymentsAddress,
          MAX_UINT256
        );
        await transaction.wait();
        setStatus("💰 Successfully approved USDFC to cover storage costs");
      }
      if (amount > 0n) {
        setStatus("💰 Depositing USDFC to cover storage costs...");
        const transaction = await synapse.payments.deposit(amount);
        await transaction.wait();
        setStatus("💰 Successfully deposited USDFC to cover storage costs");
      }

      setStatus(
        "💰 Approving Filecoin Warm Storage service USDFC spending rates..."
      );
      const transaction = await synapse.payments.approveService(
        synapse.getPandoraAddress(),
        epochRateAllowance,
        lockupAllowance + fee
      );
      await transaction.wait();
      setStatus(
        "💰 Successfully approved Filecoin Warm Storage spending rates"
      );
    },
    onSuccess: () => {
      setStatus("✅ Payment was successful!");
      triggerConfetti();
    },
    onError: (error) => {
      console.error("Payment failed:", error);
      setStatus(
        `❌ ${error.message || "Transaction failed. Please try again."}`
      );
    },
  });
  return { mutation, status };
};
