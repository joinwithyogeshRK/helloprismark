import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isPast, isToday } from 'date-fns';
import { Check, Clock, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Task, useTaskContext } from '@/context/TaskContext';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-100 text-danger-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'low':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'work':
        return 'bg-primary-100 text-primary-700';
      case 'personal':
        return 'bg-purple-100 text-purple-700';
      case 'shopping':
        return 'bg-blue-100 text-blue-700';
      case 'health':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    
    if (isPast(dueDate) && !isToday(dueDate)) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    
    if (isToday(dueDate)) {
      return (
        <Badge variant="outline" className="border-warning-500 text-warning-700">
          <Clock className="mr-1 h-3 w-3" />
          Today
        </Badge>
      );
    }
    
    return null;
  };

  return (
    <div
      className={`task-item ${task.completed ? 'task-item-completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => toggleTaskCompletion(task.id)}
        className="checkbox"
      />
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Link to={`/task/${task.id}`} className="flex-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-neutral-500' : ''}`}>
              {task.title}
            </h3>
          </Link>
          
          {isHovered && (
            <div className="flex items-center gap-1">
              <Link to={`/task/${task.id}`}>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-danger-500 hover:text-danger-700"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-neutral-500">
          <Badge className={getPriorityClass(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          
          <Badge className={getCategoryClass(task.category)}>
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </Badge>
          
          {task.dueDate && (
            <span className="text-xs">
              Due: {format(new Date(task.dueDate), 'MMM d')}
            </span>
          )}
          
          {getDueDateStatus()}
        </div>
      </div>
    </div>
  );
}
