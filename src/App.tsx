import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoShell from './templates/todo/TodoShell.tsx'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoShell />
    </QueryClientProvider>
  )
}

export { App }
