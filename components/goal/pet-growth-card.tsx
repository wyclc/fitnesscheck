import { getPetGrowthStage } from '@/lib/selectors/pet-growth';

export function PetGrowthCard({ completedCount, targetCount }: { completedCount: number, targetCount: number }) {
  const stage = getPetGrowthStage(completedCount, targetCount);
  
  const stageInfo = {
    'egg': { emoji: '🥚', text: '還是一顆蛋，需要運動來孵化！' },
    'baby': { emoji: '🐣', text: '剛孵化的小寶貝，持續運動讓牠長大！' },
    'growing': { emoji: '🐥', text: '正在茁壯成長！' },
    'mature': { emoji: '🦅', text: '完全體！帥氣的姿態！' }
  };
  
  const info = stageInfo[stage] || stageInfo['egg'];
  
  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 flex flex-col items-center text-center shadow-inner mb-6 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="text-7xl mb-4 relative z-10 animate-bounce">{info.emoji}</div>
      <h3 className="font-bold text-lg text-indigo-900 relative z-10 mb-2">精靈成長階段</h3>
      <p className="text-sm font-medium text-indigo-700 relative z-10">{info.text}</p>
    </div>
  );
}
