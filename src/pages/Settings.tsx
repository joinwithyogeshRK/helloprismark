import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import { useTheme } from '@/components/ThemeProvider';
import { useTaskContext } from '@/context/TaskContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { tasks } = useTaskContext();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const clearAllTasks = () => {
    localStorage.removeItem('tasks');
    window.location.reload();
    toast({
      title: "All tasks cleared",
      description: "All your tasks have been permanently deleted.",
    });
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

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          <div className="card mb-6">
            <h2 className="text-lg font-medium mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-neutral-500">
                  Choose between light and dark mode
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="flex items-center gap-2"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    Light
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="card mb-6">
            <h2 className="text-lg font-medium mb-4">Data Management</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Clear All Tasks</h3>
                <p className="text-sm text-neutral-500">
                  Delete all your tasks permanently
                </p>
              </div>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-danger-500 hover:bg-danger-600"
                    disabled={tasks.length === 0}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your tasks
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={clearAllTasks}
                      className="bg-danger-500 hover:bg-danger-600 text-white"
                    >
                      Delete All Tasks
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-medium mb-4">About</h2>
            <div>
              <h3 className="font-medium">Todo App</h3>
              <p className="text-sm text-neutral-500 mb-2">
                Version 1.0.0
              </p>
              <p className="text-sm text-neutral-500">
                A simple and efficient task management application built with React and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
