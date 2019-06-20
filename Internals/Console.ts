import chalk from "chalk";

function date() {
    const date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(e => e < 10 ? `0${e}` : e).join(":");
}

export class Console {
    
    static log(title: string, message: string): boolean {
        return process.stdout.write(`[${chalk.gray(date())}][${chalk.magenta(title)}]: ${chalk.cyan(message)}\n`);
    }

    static success(title: string, message: string): boolean {
        return process.stdout.write(`[${chalk.gray(date())}][${chalk.magenta(title)}]: ${chalk.green(message)}\n`);
    }

    static warn(title: string, message: string): boolean {
        return process.stdout.write(`[${chalk.gray(date())}][${chalk.magenta(title)}]: ${chalk.yellow(message)}\n`);
    }

    static error(title: string, message: string): boolean {
        return process.stdout.write(`[${chalk.gray(date())}][${chalk.magenta(title)}]: ${chalk.red(message)}\n`);
    }

}