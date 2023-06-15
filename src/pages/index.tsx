import { JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import React, { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { notification } from 'antd';


export default function Home() {
  const [message, setMessage] = useState('');
  const [fetchMessage, setFetchMessage] = useState('');

  const { signAndExecuteTransactionBlock } = useWallet();

  const [api, contextHolder] = notification.useNotification();

  async function setMsg() {
    //  清空表单中的input值
    setMessage('');

    try {
      const tx = new TransactionBlock();
      console.log(`${process.env.NEXT_PUBLIC_DAPP_PACKAGE}::${process.env.NEXT_PUBLIC_DAPP_MODULE}::setMessage`);
      tx.moveCall({
        target: `${process.env.NEXT_PUBLIC_DAPP_PACKAGE}::${process.env.NEXT_PUBLIC_DAPP_MODULE}::setMessage` as any,
        arguments: [
          tx.pure("0x7969799a82f209874a755f96effa11feed7b8a303a0c7f4bfffdeba9bb0ca1b6"),
          tx.pure(message)
        ]
      });

      const resData = await signAndExecuteTransactionBlock({
        transactionBlock: tx
      });

      setTimeout(getMsg,2000);
      await openNotification(`https://suiexplorer.com/txblock/${resData.digest}?network=${process.env.NEXT_PUBLIC_SUI_NETWORK}`)
      
    } catch (e) {
      console.error('failed', e);
    }
  };

  async function openNotification(link: string) {
    const openNotificationWithIcon = (type:any) => {
      api[type]({
        message: 'Success',
        description: link,
      });
    };
    openNotificationWithIcon('success');
  }

  async function getMsg() {
    const provider = new JsonRpcProvider();
    const txn = await provider.getObject({
      id: '0x7969799a82f209874a755f96effa11feed7b8a303a0c7f4bfffdeba9bb0ca1b6',
      // fetch the object content field
      options: { showContent: true },
    });
    setFetchMessage(txn.data?.content?.fields.value)
  }

  useEffect(() => {
    (async () => {
        getMsg()
    })()
  }, [])

  return (
    <>
      {contextHolder}
      <div className="card">      
        <div className="w-full bg-white">
          <label className="text-l sm:text-xl px-4">Set Message:</label>
          <div className="px-4">
            <input
              placeholder="Message"
              className="text-input"
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <label className="text-xs px-4 text-gray-400">Get Message: {fetchMessage}</label>
        </div>
        <div className="flex justify-center py-2 px-4">
          <button
            className="btn-neutral"
            onClick={setMsg}
            >
            Set Message
          </button>
        </div>
      </div>
    </>
  );
}
