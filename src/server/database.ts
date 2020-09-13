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

    this.prefix = parent ? `${parent.prefix}${name}.` : `${name}.`;
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
    const needPrefix = [
      'gt',
      'gte',
      'lt',
      'lte',
      'all',
    ];

    const prefixedOption = Object.entries(option).reduce((previous, [key, value], ) => {
      if (needPrefix.includes(key)) {
        const objectToAdd = {} as any;
        objectToAdd[key] = this.prefix + value;
        return { ...previous, ...objectToAdd };
      }
      return previous;
    }, {}) as typeof option;

    return (db as level<Result>).stream(prefixedOption);
  }

  public async exists<Result = any>(key: string) {
    return db.exists(this.prefix + key);
  }

  public async all<Result = any>() {
    return (db as level<Result>).stream({
      all: this.prefix,
      values: true,
      keys: false,
    })
  }
}

const database = new Database({
  name: 'root',
})

export default database;
