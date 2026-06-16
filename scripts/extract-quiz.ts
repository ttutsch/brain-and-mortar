// Dumps every quiz question with its KEYED answer + explanation so answer-key
// correctness can be eyeballed (the explanation usually states the true answer,
// so answer≠explanation flags a bad correctIndex). Filter to math-ish missions
// via argv. Run with esbuild bundle like audit-content.ts.
import { MISSIONS } from '../src/data/missions';
import type { Mission, Tier, QuizRound } from '../src/data/missions';

const onlySubstr = process.argv[2]; // optional: only missions whose id contains this

for (const m of Object.values(MISSIONS) as Mission[]) {
  if (onlySubstr && !m.id.includes(onlySubstr)) continue;
  ([1, 2, 3] as Tier[]).forEach((tier) => {
    const v = m.tiers[tier];
    if (v.pattern !== 'quiz') return;
    const rounds = (v.params as { rounds: QuizRound[] }).rounds;
    rounds.forEach((r, ri) => {
      r.questions.forEach((q) => {
        const ans = q.options[q.correctIndex];
        console.log(`\n[${m.id} T${tier} r${ri + 1}] ${q.question.replace(/\n/g, ' ')}`);
        console.log(`   KEY → ${ans}`);
        if (q.explanation) console.log(`   EXP   ${q.explanation.replace(/\n/g, ' ')}`);
      });
    });
  });
}
