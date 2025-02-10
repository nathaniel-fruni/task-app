<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tasks', ['tasks' => Task::all(),]);
    }

    public function store(Request $request): Response
    {
        $task = Task::create($request->validate([
            'name' => ['required', 'max:50'],
            'description' => ['max:255'],
        ], [
            'name.required' => 'Názov úlohy nesmie byť prázdny.',
            'name.max' => 'Názov úlohy nesmie mať viac ako 50 znakov.',
            'description.max' => 'Popis úlohy nesmie mať viac ako 255 znakov.',
        ]));

        return Inertia::render('Tasks', ['newTask' => $task]);
    }

    public function update(Request $request, int $id): Response
    {
        $task = Task::findOrFail($id);

        $task->update($request->validate([
            'name' => ['required', 'max:50'],
            'description' => ['max:255'],
        ], [
            'name.required' => 'Názov úlohy nesmie byť prázdny.',
            'name.max' => 'Názov úlohy nesmie mať viac ako 50 znakov.',
            'description.max' => 'Popis úlohy nesmie mať viac ako 255 znakov.',
        ]));

        return Inertia::render('Tasks', ['updatedTask' => $task]);
    }

    public function updateCompletion(Request $request, int $id): RedirectResponse
    {
        $task = Task::findOrFail($id);

        $task->update($request->validate([
            'completed' => ['required', 'boolean'],
            ['completed.required' => 'Chýba informácia o stave úlohy.']
        ]));

        return to_route('tasks.index');
    }

    public function destroy(int $id): RedirectResponse
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return to_route('tasks.index');
    }
}
