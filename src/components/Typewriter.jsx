import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Typewriter({ text, delay = 1200, speed = 18 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setLoading(true);
    setTyping(false);

    // Initial skeleton delay
    const timer = setTimeout(() => {
      setLoading(false);
      setTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  useEffect(() => {
    if (!typing) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [typing, text, speed]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-brand-blue text-sm animate-pulse p-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        HealthBuddy AI is analyzing...
      </div>
    );
  }

  return (
    <span className="whitespace-pre-line leading-relaxed text-sm">
      {displayedText}
      {typing && <span className="inline-block w-1.5 h-4 ml-0.5 bg-brand-blue animate-pulse align-middle" />}
    </span>
  );
}
