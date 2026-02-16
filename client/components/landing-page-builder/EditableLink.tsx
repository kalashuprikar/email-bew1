import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface EditableLinkProps {
  label: string;
  href: string;
  onUpdate?: (label: string, href: string) => void;
  onDelete?: () => void;
  inline?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  label,
  href,
  onUpdate,
  inline = true,
  isSelected = false,
  isHovered = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label);
  const [editHref, setEditHref] = useState(href);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editLabel, editHref);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(label);
    setEditHref(href);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        placeholder="Text"
        value={editLabel}
        onChange={(e) => setEditLabel(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') handleCancel();
        }}
        className="text-xs px-3 py-2 border border-solid border-valasys-orange rounded-full bg-white focus:outline-none w-40 z-50"
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-pointer px-3 py-2 rounded-full transition-all ${
        isHovered ? "border border-dashed border-gray-400" : ""
      } ${isSelected ? "font-semibold text-valasys-orange" : ""}`}
      title="Click to edit"
    >
      {inline ? <span>{label}</span> : <a href={href}>{label}</a>}
    </div>
  );
};
