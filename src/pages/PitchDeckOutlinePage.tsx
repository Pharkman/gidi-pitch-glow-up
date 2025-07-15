import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, Edit, Plus, GripVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SortableItem({ id, section, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: 'white',
    borderRadius: 8,
    boxShadow: isDragging ? '0 2px 8px rgba(0,0,0,0.08)' : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-4 border mb-2">
      <span {...attributes} {...listeners} className="cursor-grab text-muted-foreground"><GripVertical /></span>
      <div className="flex-1">
        <div className="font-medium text-base">{section.title}</div>
        <div className="text-sm text-muted-foreground">{section.description}</div>
      </div>
      <Button size="icon" variant="ghost" onClick={() => onEdit(id)}><Edit className="h-4 w-4" /></Button>
      <Button size="icon" variant="ghost" onClick={() => onDelete(id)}><X className="h-4 w-4" /></Button>
    </div>
  );
}

const initialSections = [
  { id: '1', title: 'Title Slide', description: 'Company name, logo, and tagline.' },
  { id: '2', title: 'Problem', description: 'What problem are you solving?' },
  { id: '3', title: 'Solution', description: 'Your product or service.' },
  { id: '4', title: 'Market', description: 'Market size and opportunity.' },
  { id: '5', title: 'Team', description: 'Founders and key team members.' },
];

export default function PitchDeckOutlinePage() {
  const [sections, setSections] = useState(initialSections);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const handleEdit = (id) => {
    const section = sections.find(s => s.id === id);
    setEditingId(id);
    setEditForm({ title: section.title, description: section.description });
  };
  const handleEditSave = () => {
    setSections(sections.map(s => s.id === editingId ? { ...s, ...editForm } : s));
    setEditingId(null);
  };
  const handleDelete = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };
  const handleAdd = () => {
    setSections([...sections, { id: Date.now().toString(), ...addForm }]);
    setShowAdd(false);
    setAddForm({ title: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Pitch Deck Outline</h2>
        <p className="text-muted-foreground mb-6">Rearrange, edit, or add sections to your pitch deck outline. Drag to reorder.</p>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
            {sections.map(section => (
              editingId === section.id ? (
                <div key={section.id} className="flex items-center gap-3 p-4 border mb-2 bg-muted/30 rounded">
                  <Input
                    className="flex-1"
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Section Title"
                  />
                  <Input
                    className="flex-1"
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description"
                  />
                  <Button size="icon" variant="ghost" onClick={handleEditSave}><Edit className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                </div>
              ) : (
                <SortableItem key={section.id} id={section.id} section={section} onEdit={handleEdit} onDelete={handleDelete} />
              )
            ))}
          </SortableContext>
        </DndContext>
        {showAdd ? (
          <div className="flex items-center gap-3 p-4 border mb-2 bg-muted/30 rounded mt-2">
            <Input
              className="flex-1"
              value={addForm.title}
              onChange={e => setAddForm({ ...addForm, title: e.target.value })}
              placeholder="Section Title"
            />
            <Input
              className="flex-1"
              value={addForm.description}
              onChange={e => setAddForm({ ...addForm, description: e.target.value })}
              placeholder="Description"
            />
            <Button size="icon" variant="ghost" onClick={handleAdd}><Plus className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" onClick={() => setShowAdd(false)}><X className="h-4 w-4" /></Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full mt-2" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" />Add Section</Button>
        )}
        <Button className="w-full mt-6" onClick={() => navigate('/pitch-deck-generating')}>Proceed</Button>
      </div>
    </div>
  );
} 