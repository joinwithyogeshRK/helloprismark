import { useState } from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskItem } from '@/components/TaskItem';
import { Task, useTaskContext, Priority, Category } from '@/context/TaskContext';

type SortOption = 'dueDate' | 'priority' | 'createdAt' | 'title';
type SortDirection = 'asc' | 'desc';
type FilterOption = 'all' | 'active' | 'completed' | Priority | Category;

export function TaskList() {
  const { tasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredTasks = tasks
    .filter((task) => {
      // Search filter
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Status filter
      let matchesFilter = true;
      if (filterBy === 'active') {
        matchesFilter = !task.completed;
      } else if (filterBy === 'completed') {
        matchesFilter = task.completed;
      } else if (
        filterBy === 'high' ||
        filterBy === 'medium' ||
        filterBy === 'low'
      ) {
        matchesFilter = task.priority === filterBy;
      } else if (
        filterBy === 'work' ||
        filterBy === 'personal' ||
        filterBy === 'shopping' ||
        filterBy === 'health' ||
        filterBy === 'other'
      ) {
        matchesFilter = task.category === filterBy;
      }

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === 'dueDate') {
        // Handle null due dates
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return sortDirection === 'asc' ? 1 : -1;
        if (!b.dueDate) return sortDirection === 'asc' ? -1 : 1;
        
        return sortDirection === 'asc'
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      
      if (sortBy === 'priority') {
        const priorityValues = { high: 3, medium: 2, low: 1 };
        return sortDirection === 'asc'
          ? priorityValues[a.priority] - priorityValues[b.priority]
          : priorityValues[b.priority] - priorityValues[a.priority];
      }
      
      if (sortBy === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      // Default to title
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Select
            value={filterBy}
            onValueChange={(value) => setFilterBy(value as FilterOption)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Added</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            className="h-10 w-10"
          >
            {sortDirection === 'asc' ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="card">
        {filteredTasks.length > 0 ? (
          <div className="divide-y divide-neutral-200">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-neutral-500">
              {searchTerm || filterBy !== 'all'
                ? "No tasks match your filters"
                : "You don't have any tasks yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
