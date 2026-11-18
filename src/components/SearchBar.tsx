import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  enableShortcut?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar tarefas, códigos ou categorias...',
  enableShortcut = true,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut]);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar">
      <Search size={16} className="search-bar__icon" />
      <input
        ref={inputRef}
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
      {value ? (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Limpar pesquisa"
          title="Limpar pesquisa"
        >
          <X size={14} />
        </button>
      ) : (
        enableShortcut && <kbd className="search-bar__shortcut">⌘K</kbd>
      )}
    </div>
  );
}
