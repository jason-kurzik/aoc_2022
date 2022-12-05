import * as fs from 'node:fs/promises';

async function main() {
	let elf_number = 0;
	const elf_list: number[] = [];
	elf_list[elf_number] = 0;

	const file = await fs.open("input/day1");

	for await (const line of file.readLines()) {
		if (line.length === 0) {
			elf_number++;
			elf_list[elf_number] = 0
		}
		else {
			elf_list[elf_number] += parseInt(line);
		}
	}

	elf_list.sort();
	let max_elf = elf_list.pop() ?? 0;
	console.log("Max Elf Calories: ", max_elf);


	/* Part 2 */
	let top_three = max_elf;
	for (let i = 1; i < 3; i++) {
		top_three += elf_list.pop() ?? 0;
	}

	console.log("Top Three: ", top_three);
}

main();
