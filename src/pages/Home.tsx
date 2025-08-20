import { Header } from '@/components/Header';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { TaskStats } from '@/components/TaskStats';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <img src="/assets/icons/alien-svgrepo-com-1755000637040.svg" alt="Alien Icon" className="w-8 h-8" />
          <img src="/assets/icons/favicon-1754999035449.ico" alt="Task Icon" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">My Tasks</h1>
        </div>
        <TaskStats />
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}
