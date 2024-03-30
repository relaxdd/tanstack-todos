import axios from 'axios'
import { ITodo, todoListSchema } from '../schemes/todos.ts'
import { ITodoStore } from '../store/todoStore.ts'
import { makeQuery } from './index.ts'

class TodosApiService {
  public static API = 'http://localhost:3000/todos'

  public static async getAll(page: number, filter: ITodoStore['filter']) {
    const query = ((page: number, data: ITodoStore['filter']) => {
      const result: Record<string, string> = {
        _sort: 'id',
        _order: 'desc',
        _page: String(page),
        _limit: String(filter.showLimit)
      }

      if (data.searchQuery) result['title_like'] = data.searchQuery
      if (data.onlyCurrent) result['completed'] = 'false'

      return makeQuery(result)
    })(page, filter)

    const resp = await axios.get(`${this.API}?${query}`)
    const items = await todoListSchema.parseAsync(resp.data)

    return { items, total: +resp.headers?.['x-total-count'] }
  }

  public static async create(title: string) {
    await axios.post<any, any, ITodo>(this.API, {
      id: Date.now(), title,
      userId: 1, completed: false,
      created: (new Date).toISOString()
    })
  }

  public static async update(item: ITodo) {
    await axios.patch(`${this.API}/${item.id}`, item)
  }

  public static async delete(id: number) {
    await axios.delete(`${this.API}/${id}`)
  }
}

export { TodosApiService }
