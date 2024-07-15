import { createWeb3Modal, useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon, sepolia, xdc } from 'wagmi/chains'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_PROJECT_ID as string
if (!projectId) throw new Error('REACT_APP_PROJECT_ID not found')

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, polygon, sepolia, xdc] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export default function App() {
  // const w3m = useWeb3Modal()
  // const { open, selectedNetworkId } = useWeb3ModalState()


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <w3m-button />

        {/* <button onClick={() => w3m.open({ view: 'Connect' })}>Connect Wallet</button> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
