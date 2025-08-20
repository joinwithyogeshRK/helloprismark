import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ArrowLeft, Calendar as CalendarIcon, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import { useTaskContext, Priority, Category } from '@/context/TaskContext';
import { cn } from '@/lib/utils';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
  category: z.enum(['work', 'personal', 'shopping', 'health', 'other']),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTaskById, updateTask, deleteTask } = useTaskContext();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [completed, setCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (!id) return;

    const task = getTaskById(id);
    if (!task) {
      toast({
        title: "Task not found",
        description: "The task you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setValue('title', task.title);
    setValue('description', task.description);
    setValue('priority', task.priority);
    setValue('category', task.category);
    setCompleted(task.completed);
    
    if (task.dueDate) {
      setDate(new Date(task.dueDate));
    }
  }, [id, getTaskById, setValue, navigate, toast]);

  const onSubmit = (data: TaskFormValues) => {
    if (!id) return;

    updateTask(id, {
      ...data,
      completed,
      dueDate: date ? date.toISOString() : null,
    });

    toast({
      title: "Task updated",
      description: "Your task has been successfully updated.",
    });

    navigate('/');
  };

  const handleDelete = () => {
    if (!id) return;

    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "Your task has been successfully deleted.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-primary-500 hover:text-primary-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tasks
          </Link>
        </div>

        <div className="card-neumorphic max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={completed}
                onCheckedChange={(checked) => setCompleted(checked as boolean)}
                className="checkbox h-6 w-6"
              />
              <h1 className="text-2xl font-bold">Edit Task</h1>
            </div>

            <div>
              <Input
                placeholder="Task title"
                {...register('title')}
                className={cn(errors.title && 'border-danger-500')}
              />
              {errors.title && (
                <p className="text-danger-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Textarea
                placeholder="Description"
                {...register('description')}
                className="resize-none min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select
                  onValueChange={(value: Priority) => setValue('priority', value)}
                  defaultValue="medium"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  onValueChange={(value: Category) => setValue('category', value)}
                  defaultValue="personal"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>No due date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="bg-danger-500 hover:bg-danger-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </Button>
              <Button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
