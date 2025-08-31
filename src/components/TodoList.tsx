import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos: initialTodos }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Personal To-dos
          <Badge variant="secondary">
            {todos.filter(t => t.completed).length}/{todos.length} completed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new todo */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a new to-do..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                todo.completed 
                  ? 'bg-muted/50 border-muted' 
                  : 'bg-background border-border hover:bg-muted/25'
              }`}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {todo.title}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No to-dos yet. Add your first one above!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
