import * as fs from 'node:fs/promises';

function allEqual(array: string[]): boolean {
	return array.every(a => { if (a == array[0]) {
								return  true;
							} }
						);
};

function findBadItemType(pack: number[][]): number {
	// 0 is left pack, 1 is right pack
	for (let item of pack[0]) {
		if (pack[1].includes(item)) {
			return item;
		}
	}
	//If no bad items are found, return 0
	return 0;
};

function convertPriority(pack: string): number[][] {
	let left_side: number[] = [];
	let right_side: number[] = [];
	
	for (let x=0; x < pack.length; x++) {
		let priority = pack.charCodeAt(x);

		// A charCode = 65, but priority = 27
		// a charCode = 97, but priority = 1

		if (priority < 97) {
			priority = priority - 38;
		} else {
			priority = priority - 96;
		};

		if (x < pack.length/2){
			left_side.push(priority);
		} else {
			right_side.push(priority);
		}
	}

	return [left_side,right_side];
};

function isInAll(x: number, array1: number[], array2: number[]): boolean {
	if(array1.includes(x) && array2.includes(x)){
		return true;
	}
	return false;
};

function groupElves(packs: number[][][]): number[] {
	let groups: number[] = [];
	
	for (let group = 0;group < packs.length-2; group += 3) {
		let elf_1: number[] = packs[group].flat();
		let elf_2: number[] = packs[group+1].flat();
		let elf_3: number[] = packs[group+2].flat();

		// Default null to -1
		let badge: number = elf_1.find(element => isInAll(element, elf_2,elf_3)) ?? -1;
		groups.push(badge);
	};
	return groups;
};

async function main(): Promise<void> {
	const file = await fs.readFile("input/day3","utf-8");

	let rucksacks = file.split("\n");
	
	let converted_rucksacks: number[][][] =
				rucksacks.map((pack: string,index: number): number[][] =>
									convertPriority(pack));
	
	// Part 1
	let bad_items: number[] =
		converted_rucksacks.map((pack: number[][], index: number): number =>
							findBadItemType(pack));
	
	let total_bad_priorities: number = 
				bad_items.reduce((total: number, item: number) => total + item,0);

	// Part 2
	let elf_groups: number[] = groupElves(converted_rucksacks);

	let total_badge_priorities: number = 
				elf_groups.reduce((total: number, item: number) => total + item,0);

	console.log("Total Bad Priorities: ",total_bad_priorities);
	console.log("Total Badge Priorities: ",total_badge_priorities);
};

main();
