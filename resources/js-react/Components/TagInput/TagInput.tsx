import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { router, usePage } from '@inertiajs/react';
import classNames from 'classnames';
import { debounce } from 'lodash';
import '../../../css/components.css';
import { useTagInputEvents } from '@/Components/TagInput/useTagInputEvents';

export interface Tag {
    id?: number;
    name: string;
}

export interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}

interface PagePropsWithTags {
    tagSuggestions?: Tag[];
    [key: string]: any;
}

const TagInput: FC<TagInputProps> = ({ 
    tags = [], 
    onChange, 
    placeholder = "Введите теги...", 
    className 
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    
    const { props } = usePage<PagePropsWithTags>();
    const suggestions = props.tagSuggestions || [];

    const addTag = (tags: string[],tagName: string) => {
        const trimmedTag = tagName.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            onChange([...tags, trimmedTag]);
        }
        setInputValue('');
        setShowSuggestions(false);
        setActiveSuggestion(-1);
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        onChange(newTags);
    };


    const eventEmitter = useTagInputEvents({
        addTag,
        setActiveSuggestion,
        removeTag,
        setShowSuggestions
    })

    const debouncedSearch = useMemo(
        () => debounce((term: string) => {
            if (term.trim() === '') {
                return;
            }

            router.get('/api/tags/search', { term }, {
                only: ['tagSuggestions'],
                preserveState: true,
                replace: true,
                preserveUrl: true
            });
        }, 300),
        []
    );

    useEffect(() => {
        if (inputValue.trim()) {
            debouncedSearch(inputValue);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
        
        return () => {
            debouncedSearch.cancel();
        };
    }, [inputValue, debouncedSearch]);

    useEffect(() => {
        if (suggestions.length > 0 && inputValue.trim()) {
            setShowSuggestions(true);
        }
    }, [suggestions, inputValue]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
        eventEmitter.emit(e.key, { 
            inputValue, 
            activeSuggestion,
            suggestions, 
            tags, 
        });
    };

    const handleSuggestionClick = (suggestion: Tag) => {
        addTag(tags, suggestion.name);
    };

    const containerClasses = classNames(
        'tag-input-container',
        className
    );

    return (
        <div className={containerClasses}>
            <div className="tag-input">
                <div className="tag-list">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag-item">
                            #{tag}
                            <button
                                type="button"
                                className="tag-remove"
                                onClick={() => removeTag(index)}
                                aria-label={`Удалить тег ${tag}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                    onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    placeholder={placeholder}
                    className="tag-input-field"
                />
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div ref={suggestionsRef} className="tag-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.id || index}
                            className={classNames('tag-suggestion', {
                                'active': index === activeSuggestion
                            })}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            #{suggestion.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagInput;