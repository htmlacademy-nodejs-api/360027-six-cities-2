import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(): void {
    console.info(`
      ${chalk.bold('Программа для подготовки данных для REST API сервера.')}

      Пример: ${chalk.yellow('cli.js --<command> [--arguments]')}

      Команды:

        ${chalk.cyan('--version')}:                   ${chalk.gray('# выводит номер версии')}
        ${chalk.cyan('--help')}:                      ${chalk.gray('# печатает этот текст')}
        ${chalk.cyan('--import <path>')}:             ${chalk.gray('# импортирует данные из TSV')}
        ${chalk.cyan('--generate <n> <path> <url>')}  ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
