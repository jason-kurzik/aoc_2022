import * as fs from 'node:fs/promises';

function parseNumbers(input: string): number[][] {
	const pair: string[] = input.split(",");
	
	let pair_array: number[][] = [];
	for (const elf of pair) {
		pair_array.push(elf.split("-").map((item: string) => parseInt(item)));
	};

	return pair_array;
};

async function main(): Promise<void> {
	const assignments: string[] = (await fs.readFile("input/day4", "utf-8")).split("\n");

	const pairs: number[][][] = assignments.map(
					(pair: string): number[][] => parseNumbers(pair));

	let fully_contained: number = 0;
	let overlap: number = 0;

	for (const pair of pairs) {
		const elf_1_start = pair[0][0];
		const elf_1_end = pair[0][1];
		const elf_2_start = pair[1][0];
		const elf_2_end = pair[1][1];

		// Part 1
		if (   (elf_1_start <= elf_2_start && elf_1_end >= elf_2_end)
			|| (elf_2_start <= elf_1_start && elf_2_end >= elf_1_end)) {
			fully_contained++;
		};
		
		// Part 2
		if (   (elf_1_start <= elf_2_start && elf_1_end >= elf_2_start)
			|| (elf_2_start <= elf_1_start && elf_2_end >= elf_1_start)) {
			overlap++;
		};
	}

	// Output
	console.log("Fully Contained Range: ",fully_contained);
	console.log("Overlapping Range: ",overlap);
};

main();
