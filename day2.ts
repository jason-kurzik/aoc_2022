import * as fs from 'node:fs/promises';

function allEqual(array: string[]): boolean {
	return array.every(a => { if (a == array[0]) {
								return  true;
							} }
						);
};

function scoreRound_p1(round: string): number {
	const throws = round.replace("X","A")
						.replace("Y","B")
						.replace("Z","C");
	const winning_combos = ["A B", "B C", "C A"];
	const win_score: number = 6;
	const draw_score: number = 3;
	const lose_score: number = 0;
	const combos = throws.split(" ");
	// Throwing Rock is 1 point
	let throw_score: number = 1;

	// Throwing Paper gives 2, Scissors 3
	if (combos[combos.length-1] == "B") {
		throw_score += 1;
	} else if (combos[combos.length-1] == "C") {
		throw_score += 2;
	}

	if (winning_combos.includes(throws)) {
		throw_score += win_score;
	}
	else if (allEqual(combos)) {
		throw_score += draw_score;
	}
	else {
		throw_score += lose_score;
	}
	return throw_score;
};

function throwScore(enemy: string, goal: number): number {
	let score: number = 1;
	if (enemy == "A") {
		if (goal == 0) {
			score += 2;
		} else if (goal == 6) {
			score += 1;
		};
	} else if (enemy == "B"){
		if(goal == 6){
			score += 2;
		} else if (goal == 3) {
			score += 1;
		};
	} else {
		if(goal == 3) {
			score += 2;
		} else if (goal == 0) {
			score += 1;
		};
	};
	return score;
}
;

function scoreRound_p2(round: string): number {

	const win_score: number = 6;
	const draw_score: number = 3;
	const lose_score: number = 0;
	const combos = round.split(" ");
	let score: number = 0;

	// Throwing Paper gives 2, Scissors 3
	if (combos[combos.length-1] == "X") {
		score += lose_score;
	} else if (combos[combos.length-1] == "Z") {
		score += win_score;
	} else {
		score += draw_score;
	}
	let total: number = throwScore(combos[0],score) + score;

	return total;
};

async function main(): Promise<void> {
	const file = await fs.readFile("input/day2","utf-8");
	let rounds = file.split("\n");
	
	//let scores: number[] = rounds.map( (round: string, index: number) => scoreRound_p1(round))
	let scores: number[] = rounds.map( (round: string, index: number) => scoreRound_p2(round))

	let total_score: number = scores.reduce((score: number, a: number) => score + a,0);
	console.log(total_score);
}

main();
