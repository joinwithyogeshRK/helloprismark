import { useTaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { isPast, isToday } from 'date-fns';

export function TaskStats() {
  const { tasks } = useTaskContext();

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const dueTodayTasks = tasks.filter(
    (task) => task.dueDate && isToday(new Date(task.dueDate)) && !task.completed
  ).length;
  
  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      isPast(new Date(task.dueDate)) &&
      !isToday(new Date(task.dueDate)) &&
      !task.completed
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'high' && !task.completed
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-neutral-500">
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">
              {completionRate.toFixed(0)}%
            </div>
            <Progress value={completionRate} className="h-2" />
            <div className="text-xs text-neutral-500">
              {completedTasks} of {totalTasks} tasks completed
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-neutral-500">
            Due Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-warning-500" />
            <div className="text-2xl font-bold">{dueTodayTasks}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-neutral-500">
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-danger-500" />
            <div className="text-2xl font-bold">{overdueTasks}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-neutral-500">
            High Priority
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary-500" />
            <div className="text-2xl font-bold">{highPriorityTasks}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
