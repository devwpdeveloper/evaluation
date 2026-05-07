import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Footer as HomeFooter, Header as HomeHeader } from './LandingPage'

type TaskStatus = 'Pending' | 'Completed'

type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  userId: string
}

type SortMode = 'newest' | 'az'

const emptyTask = { title: '', description: '', status: 'Pending' as TaskStatus }

export function TasksPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const storageKey = `prospectroute-tasks-${user?.uid ?? 'guest'}`
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = window.localStorage.getItem(storageKey)
    return savedTasks ? (JSON.parse(savedTasks) as Task[]) : []
  })
  const [form, setForm] = useState(emptyTask)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editForm, setEditForm] = useState(emptyTask)
  const [error, setError] = useState('')
  const [editError, setEditError] = useState('')
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('newest')

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks))
  }, [storageKey, tasks])

  const searchText = query.trim().toLowerCase()
  const visibleTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchText))
    .sort((first, second) => {
      if (sortMode === 'az') return first.title.localeCompare(second.title)
      return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
    })
  const completedCount = tasks.filter((task) => task.status === 'Completed').length
  const pendingCount = tasks.filter((task) => task.status === 'Pending').length

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.title.trim()) {
      setError('Task title is required.')
      return
    }

    if (!form.description.trim()) {
      setError('Task description is required.')
      return
    }

    setTasks((currentTasks) => [
      {
        id: crypto.randomUUID(),
        title: form.title,
        description: form.description,
        status: form.status,
        createdAt: new Date().toISOString(),
        userId: user?.uid ?? 'guest',
      },
      ...currentTasks,
    ])

    setForm(emptyTask)
    setError('')
  }

  function editTask(task: Task) {
    setEditingTask(task)
    setEditForm({ title: task.title, description: task.description, status: task.status })
    setEditError('')
  }

  function closeEditModal() {
    setEditingTask(null)
    setEditForm(emptyTask)
    setEditError('')
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!editForm.title.trim()) {
      setEditError('Task title is required.')
      return
    }

    if (!editForm.description.trim()) {
      setEditError('Task description is required.')
      return
    }

    if (!editingTask) return

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTask.id ? { ...task, title: editForm.title, description: editForm.description, status: editForm.status } : task,
      ),
    )
    closeEditModal()
  }

  function deleteTask(taskId: string) {
    if (window.confirm('Delete this task?')) {
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    }
  }

  return (
    <div className="min-h-screen bg-[#fff8c7]">
      <HomeHeader onOpenAuth={(mode) => navigate(`/${mode}`)} />
      <main>
        <section className="relative overflow-hidden bg-black px-5 pb-10 pt-32 text-white md:pb-14 md:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_18%,rgba(255,240,0,0.14),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0)_72%,rgba(0,0,0,0.9)_100%)]" />
          <img
            alt=""
            className="dashboard-hero-drift pointer-events-none absolute bottom-[-58px] left-[43%] z-10 hidden w-[min(34vw,520px)] rotate-[-8deg] opacity-38 drop-shadow-[0_34px_34px_rgba(0,0,0,0.8)] lg:block"
            src="/figma-assets/product-rocket-full.png"
          />
          <img
            alt=""
            className="dashboard-hero-bob pointer-events-none absolute bottom-[-34px] left-[34%] z-10 hidden w-[min(15vw,220px)] opacity-38 drop-shadow-[0_34px_34px_rgba(0,0,0,0.85)] xl:block"
            src="/figma-assets/hero-berry-bottle.png"
          />
          <div className="relative z-20 mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative z-20">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#fff000]">My Tasks Dashboard</p>
              <h1 className="mt-3 font-display text-7xl leading-none text-white sm:text-8xl">Tasks</h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/75">
                Create, sort, and finish daily work in a workspace that keeps the same high-energy direction as the landing page.
              </p>
              <div className="mt-7 grid max-w-xl grid-cols-3 overflow-hidden rounded-[12px] border border-white/15 bg-white/10">
                <Stat label="Total" value={tasks.length} />
                <Stat label="Pending" value={pendingCount} />
                <Stat label="Done" value={completedCount} />
              </div>
            </div>

            <form
              className="relative z-20 overflow-hidden rounded-[12px] border border-[#fff000]/70 bg-[#111111]/88 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur"
              onSubmit={handleSubmit}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[#fff000]" />
              <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-[#fff000]/15 blur-3xl" />
              <p className="font-display text-4xl text-[#fff000]">Create Task</p>
              <div className="mt-5 space-y-4">
                <Input
                  label="Title"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-[#fff000]"
                />
                <label className="block">
                  <span className="text-sm font-bold uppercase tracking-[0.08em] text-white/75">Description</span>
                  <textarea
                    className="mt-2 min-h-28 w-full rounded-[12px] border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/45 focus:border-[#fff000] focus:ring-4 focus:ring-[#fff000]/20"
                    value={form.description}
                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold uppercase tracking-[0.08em] text-white/75">Status</span>
                  <select
                    className="mt-2 h-12 w-full rounded-[12px] border border-white/20 bg-white/10 px-4 text-white outline-none focus:border-[#fff000] focus:ring-4 focus:ring-[#fff000]/20"
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as TaskStatus }))}
                  >
                    <option className="text-black">Pending</option>
                    <option className="text-black">Completed</option>
                  </select>
                </label>
                {error ? <p className="rounded-[12px] border border-[#e84545]/30 bg-[#fff4f4] p-3 text-sm font-bold text-[#e84545]">{error}</p> : null}
                <div className="flex flex-wrap gap-3">
                  <Button type="submit">Create Task</Button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1760px] px-5 py-10">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#cc2fb8]">Task List</p>
              <h2 className="mt-2 font-display text-5xl text-black">Current Work</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input label="Search tasks" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title" />
              <label className="block min-w-[180px]">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#4c4c4c]">Sort</span>
                <select
                  className="mt-2 h-12 w-full rounded-[12px] border border-black/15 bg-white px-4 text-[#191919] outline-none focus:border-[#f89821] focus:ring-4 focus:ring-[#fff000]/30"
                  value={sortMode}
                  onChange={(event) => setSortMode(event.target.value as SortMode)}
                >
                  <option value="newest">Newest first</option>
                  <option value="az">A-Z</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleTasks.map((task) => (
              <Card key={task.id} className="flex min-h-[280px] flex-col justify-between overflow-hidden p-5">
                <div>
                  <div className="mb-5 h-2 w-full rounded-full bg-[#fff000]" />
                  <p className="font-display text-4xl leading-none text-black">{task.title}</p>
                  <p className="mt-3 font-semibold leading-7 text-[#4c4c4c]">{task.description}</p>
                </div>
                <div className="mt-6">
                  <p className="inline-flex rounded-br-[18px] rounded-tl-[18px] bg-black px-4 py-2 text-sm font-bold text-[#fff000]">
                    {task.status} - {new Date(task.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button type="button" onClick={() => editTask(task)}>
                      Edit
                    </Button>
                    <Button type="button" onClick={() => deleteTask(task.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {visibleTasks.length === 0 ? <Card className="p-6 font-semibold text-[#4c4c4c]">No tasks to display.</Card> : null}
          </div>
        </section>
      </main>
      {editingTask ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="edit-task-title">
          <form className="w-full max-w-xl rounded-[12px] border border-[#fff000] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]" onSubmit={handleEditSubmit}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#cc2fb8]">Edit Task</p>
                <h2 className="mt-2 font-display text-5xl leading-none text-black" id="edit-task-title">
                  Update Work
                </h2>
              </div>
              <button className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff000] text-xl font-bold text-black transition hover:bg-black hover:text-[#fff000]" type="button" onClick={closeEditModal}>
                x
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <Input label="Title" value={editForm.title} onChange={(event) => setEditForm((current) => ({ ...current, title: event.target.value }))} />
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#4c4c4c]">Description</span>
                <textarea
                  className="mt-2 min-h-28 w-full rounded-[12px] border border-black/15 bg-white px-4 py-3 text-[#191919] outline-none focus:border-[#f89821] focus:ring-4 focus:ring-[#fff000]/30"
                  value={editForm.description}
                  onChange={(event) => setEditForm((current) => ({ ...current, description: event.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#4c4c4c]">Status</span>
                <select
                  className="mt-2 h-12 w-full rounded-[12px] border border-black/15 bg-white px-4 text-[#191919] outline-none focus:border-[#f89821] focus:ring-4 focus:ring-[#fff000]/30"
                  value={editForm.status}
                  onChange={(event) => setEditForm((current) => ({ ...current, status: event.target.value as TaskStatus }))}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </label>
              {editError ? <p className="rounded-[12px] border border-[#e84545]/30 bg-[#fff4f4] p-3 text-sm font-bold text-[#e84545]">{editError}</p> : null}
              <div className="flex flex-wrap gap-3">
                <Button type="submit">Update Task</Button>
                <Button type="button" variant="secondary" onClick={closeEditModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
      <HomeFooter />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-r border-white/15 p-4 last:border-r-0">
      <p className="font-display text-5xl leading-none text-[#fff000]">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/65">{label}</p>
    </div>
  )
}
