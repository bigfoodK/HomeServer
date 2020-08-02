import level from 'level-ts';
import config from './config';

const db = new level(config.dbPath);

class Database {
  constructor(props: {
    parent?: Database,
    name: string,
  }) {
    const {
      name,
      parent,
    } = props;

    this.name = name;

    this.prefix = parent ? `${parent.prefix}.${name}` : `${name}.`;
  }

  public readonly name: string;

  public readonly prefix: string;

  public getSubDatabase(name: string) {
    return new Database({
      name,
      parent: this,
    });
  }

  public async put<Result = any>(key: string, value: Result) {
    return (db as level<Result>).put(this.prefix + key, value);
  }

  public async get<Result = any>(key: string) {
    return (db as level<Result>).get(this.prefix + key);
  }

  public async del<Result = any>(key: string) {
    return (db as level<Result>).del(this.prefix + key);
  }

  public async stream<Result = any>(option: Partial<{
    gt: string;
    gte: string;
    lt: string;
    lte: string;
    all: string;
    reverse: boolean;
    limit: number;
    keys: true;
    values: true;
  }>) {
    const {
      gt,
      gte,
      lt,
      lte,
      all,
      reverse,
      limit,
      keys,
      values,
    } = option;

    return (db as level<Result>).stream({
      gt: gt ? this.prefix + gt : gt,
      gte: gte ? this.prefix + gte : gte,
      lt: lt ? this.prefix + lt : lt,
      lte: lte ? this.prefix + lte : lte,
      all: all ? this.prefix + all : all,
      reverse,
      limit,
      keys,
      values,
    });
  }
}

const database = new Database({
  name: 'root',
})

export default database;
