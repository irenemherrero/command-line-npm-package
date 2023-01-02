#!/usr/bin/env node

import chalk from "chalk"; // colors in console messages
import chalkAnimation from "chalk-animation";
import figlet from "figlet"; // generates text in console with characters, something impresive
import gradient from "gradient-string";
import inquirer from "inquirer"; // collect user input
import { createSpinner } from "nanospinner";

let playerName

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))
const welcome = async () => {
	const rainbowTitle = chalkAnimation.rainbow("Who wants to be a Javascript millionaire")
	await sleep()
	rainbowTitle.stop()

	console.log(`
		${chalk.bgBlue('HOW TO PLAY')}
		I am a process in your computer
		If you get any answer wrong I will be ${chalk.bgRed('killed')}
		So get all the questions right
	`)
}

const askName = async() => {
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: 'What is your name?',
		default() { return 'Player' }
	})
	playerName = answers.player_name
}

const question1 = async() => {
	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: 'What is whatever?',
		choices: [
			'Opction 1',
			'Option 2',
			'Option 3'
		],
		default() { return 'Opction 1' },
	})
	return handleAnswer(answers.question_1 === 'Option 2')
}

const handleAnswer = async isCorrect => {
	const spinner = createSpinner('Checking answer...').start()
	await sleep()
	if(isCorrect) {
		spinner.success({ text: `Nice work ${playerName}`})
	} else {
		spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}`})
		process.exit(1)
	}
}

const winner = () => {
	console.clear()
	const msg = `Congrats ${playerName}!`
	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data))
	})
}

export const fireQuestions = async () => {
	await welcome()
	await askName()
	await question1()
	await winner()
}
