// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    books: {
      id: string;
      title: string;
      author: string;
      genrer: string;
      created_at: Date;
      session_id?: string;
      user_id: string;
    };
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: Date;
    };
  }
}
