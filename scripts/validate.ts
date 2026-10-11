// Sanity-checks the question bank: counts, shape, duplicates, answer-letter leakage.
import { questions } from '../src/lib/questions';

const errors: string[] = [];
const ids = new Set<string>();
const texts = new Set<string>();

for (const q of questions) {
	if (ids.has(q.id)) errors.push(`${q.id}: duplicate id`);
	ids.add(q.id);
	if (texts.has(q.q)) errors.push(`${q.id}: duplicate question text`);
	texts.add(q.q);
	const opts = [q.correct, ...q.wrong];
	if (new Set(opts).size !== 4) errors.push(`${q.id}: options must be 4 distinct strings`);
	if (opts.some((o) => !o.trim())) errors.push(`${q.id}: empty option`);
	if (q.why.length < 80) errors.push(`${q.id}: explanation too short (${q.why.length})`);
	if (/\b(option|answer) [A-D]\b/i.test(q.why)) errors.push(`${q.id}: explanation refers to a letter, but options are shuffled`);
}

const by = (f: (q: (typeof questions)[number]) => string) =>
	questions.reduce<Record<string, number>>((m, q) => ((m[f(q)] = (m[f(q)] ?? 0) + 1), m), {});

console.log('total', questions.length, '| by topic', by((q) => q.topic), '| by level', by((q) => q.level));
if (errors.length) {
	console.error('\n' + errors.join('\n'));
	process.exit(1);
}
console.log('OK');
