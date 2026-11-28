import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      console.error(chalk.red('Укажите путь к TSV-файлу: --import <path>'));
      return;
    }

    const fileReader = new TSVFileReader(filename);

    try {
      fileReader.read();
      const offers = fileReader.toArray();
      console.info(chalk.green(`Импортировано предложений: ${offers.length}`));
      console.info(offers);
    } catch (err: unknown) {
      console.error(chalk.red(`Не удалось импортировать данные из файла ${filename}`));

      if (err instanceof Error) {
        console.error(chalk.red(err.message));
      }
    }
  }
}
