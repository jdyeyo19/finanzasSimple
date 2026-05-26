import { FinanzasContext } from './AppContext/FinanzasContext'
import {QueryClientProvider, QueryClient, } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import FinanzasRoutes from './AppRoutes/FinanzasRoutes'


function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initalIsOpen={false}/>
      <FinanzasContext>
        <FinanzasRoutes />
      </FinanzasContext>
    </QueryClientProvider>
  )
}

export default App
