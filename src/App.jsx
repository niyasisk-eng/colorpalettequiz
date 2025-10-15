import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

const ColorPaletteQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions = [
    {
      id: 'environment',
      question: 'Which environment speaks to your soul?',
      options: [
        { text: 'Misty forest at dawn', value: 'nature', gradient: 'from-emerald-400 to-teal-600' },
        { text: 'Bustling city at night', value: 'urban', gradient: 'from-indigo-500 to-purple-600' },
        { text: 'Serene beach at sunset', value: 'coastal', gradient: 'from-orange-400 to-pink-500' },
        { text: 'Mountain peaks under stars', value: 'celestial', gradient: 'from-blue-600 to-indigo-800' }
      ]
    },
    {
      id: 'emotion',
      question: 'How do you want to feel when you enter a room?',
      options: [
        { text: 'Calm and grounded', value: 'peaceful', gradient: 'from-slate-400 to-slate-600' },
        { text: 'Energized and inspired', value: 'vibrant', gradient: 'from-yellow-400 to-orange-500' },
        { text: 'Sophisticated and confident', value: 'elegant', gradient: 'from-gray-700 to-gray-900' },
        { text: 'Creative and playful', value: 'joyful', gradient: 'from-pink-400 to-rose-500' }
      ]
    },
    {
      id: 'texture',
      question: 'Which texture draws you in?',
      options: [
        { text: 'Soft velvet and silk', value: 'luxe', gradient: 'from-purple-500 to-pink-600' },
        { text: 'Raw wood and stone', value: 'natural', gradient: 'from-amber-600 to-stone-700' },
        { text: 'Smooth glass and metal', value: 'modern', gradient: 'from-cyan-400 to-blue-500' },
        { text: 'Worn leather and linen', value: 'rustic', gradient: 'from-yellow-700 to-amber-800' }
      ]
    },
    {
      id: 'time',
      question: 'When do you feel most alive?',
      options: [
        { text: 'Early morning, first light', value: 'dawn', gradient: 'from-sky-300 to-blue-400' },
        { text: 'Golden hour, warm glow', value: 'golden', gradient: 'from-amber-400 to-orange-500' },
        { text: 'Twilight, between worlds', value: 'dusk', gradient: 'from-violet-500 to-purple-700' },
        { text: 'Deep night, under moonlight', value: 'midnight', gradient: 'from-slate-700 to-slate-900' }
      ]
    },
    {
      id: 'energy',
      question: 'What kind of energy resonates with you?',
      options: [
        { text: 'Bold and passionate', value: 'fierce', gradient: 'from-red-500 to-rose-600' },
        { text: 'Gentle and nurturing', value: 'soft', gradient: 'from-green-300 to-emerald-400' },
        { text: 'Mysterious and deep', value: 'enigmatic', gradient: 'from-indigo-600 to-violet-800' },
        { text: 'Bright and optimistic', value: 'radiant', gradient: 'from-yellow-300 to-amber-400' }
      ]
    }
  ];

  const paletteProfiles = {
    'nature-peaceful': {
      name: 'Woodland Serenity',
      colors: ['#A8D5BA', '#73A580', '#2F5233', '#E8F5E9', '#4A7C59'],
      theme: 'The Grounded Dreamer',
      description: 'You find beauty in simplicity and strength in stillness. Your palette reflects a soul that seeks harmony with nature and values authenticity above all. You create spaces that feel like a gentle exhale—safe, nurturing, and deeply restorative.',
      traits: ['Mindful', 'Authentic', 'Nurturing', 'Patient']
    },
    'nature-vibrant': {
      name: 'Tropical Bloom',
      colors: ['#FF6B9D', '#FFA07A', '#98D8C8', '#6BCF7F', '#FFE66D'],
      theme: 'The Vibrant Naturalist',
      description: 'You believe nature is meant to be celebrated in full color. Your palette bursts with the energy of exotic flowers and sun-drenched landscapes. You bring life and vitality to every space, creating environments that feel alive and joyful.',
      traits: ['Energetic', 'Joyful', 'Spontaneous', 'Free-spirited']
    },
    'nature-elegant': {
      name: 'Sage Sophisticate',
      colors: ['#9CAF88', '#C7B8A1', '#E8DCC4', '#6B7F60', '#F5F1E8'],
      theme: 'The Organic Minimalist',
      description: 'You appreciate the refined side of nature—muted greens, weathered stone, natural linen. Your palette speaks to someone who finds luxury in organic materials and understated beauty. You create spaces that breathe with quiet elegance.',
      traits: ['Refined', 'Composed', 'Discerning', 'Serene']
    },
    'urban-vibrant': {
      name: 'Neon Pulse',
      colors: ['#FF006E', '#8338EC', '#3A86FF', '#06FFF0', '#1A1A2E'],
      theme: 'The Electric Soul',
      description: 'You thrive in contrast and are not afraid to make bold statements. Your palette pulses with the energy of city lights and late-night creativity. You design with intention, creating spaces that feel alive, dynamic, and unapologetically bold.',
      traits: ['Bold', 'Innovative', 'Confident', 'Dynamic']
    },
    'urban-elegant': {
      name: 'Metropolitan Edge',
      colors: ['#2C2C2C', '#5D5D5D', '#A8A8A8', '#D4AF37', '#F5F5F5'],
      theme: 'The Urban Sophisticate',
      description: 'You embody city chic with a refined edge. Your palette combines the sleekness of modern architecture with touches of luxury. You create spaces that feel polished, professional, and powerfully elegant.',
      traits: ['Sophisticated', 'Ambitious', 'Polished', 'Commanding']
    },
    'urban-joyful': {
      name: 'Street Art Spark',
      colors: ['#FF5757', '#FFBD39', '#52B788', '#4ECDC4', '#292F36'],
      theme: 'The Urban Creative',
      description: 'You see the city as your canvas. Your palette reflects the vibrant murals and creative energy of urban culture. You mix high and low, serious and playful, creating spaces that are uniquely expressive and full of personality.',
      traits: ['Artistic', 'Expressive', 'Bold', 'Unconventional']
    },
    'coastal-peaceful': {
      name: 'Ocean Calm',
      colors: ['#B8D8D8', '#7A9E9F', '#4F6F8F', '#EEF4F7', '#506C7F'],
      theme: 'The Tranquil Soul',
      description: 'You are drawn to the meditative qualities of the ocean. Your palette captures the peaceful moments—soft morning mist, gentle waves, weathered driftwood. You create sanctuaries that soothe the mind and restore the spirit.',
      traits: ['Peaceful', 'Reflective', 'Calming', 'Centered']
    },
    'coastal-elegant': {
      name: 'Sunset Luxe',
      colors: ['#FFB347', '#FF8C94', '#B565A7', '#955196', '#2D2327'],
      theme: 'The Refined Optimist',
      description: 'You blend warmth with sophistication, creating an atmosphere that is both inviting and elevated. Your palette speaks to someone who appreciates life\'s finer moments while maintaining an approachable grace. You curate experiences, not just spaces.',
      traits: ['Sophisticated', 'Warm', 'Optimistic', 'Refined']
    },
    'coastal-vibrant': {
      name: 'Coral Reef',
      colors: ['#FF6F61', '#FFD93D', '#6BCB77', '#4D96FF', '#F8B195'],
      theme: 'The Coastal Explorer',
      description: 'You embrace the playful, colorful side of beach life. Your palette is inspired by tropical fish, coral reefs, and endless summer days. You create spaces that feel like a perpetual vacation—bright, cheerful, and inviting.',
      traits: ['Adventurous', 'Optimistic', 'Playful', 'Social']
    },
    'celestial-enigmatic': {
      name: 'Cosmic Mystery',
      colors: ['#2D1B69', '#5B3A70', '#8B5A8C', '#B794F4', '#E9D5FF'],
      theme: 'The Mystical Thinker',
      description: 'You are drawn to the space between—twilight, possibilities, the unseen. Your palette reflects a mind that questions deeply and sees beauty in complexity. You create environments that invite contemplation and spark imagination.',
      traits: ['Intuitive', 'Deep', 'Imaginative', 'Introspective']
    },
    'celestial-peaceful': {
      name: 'Lunar Serenity',
      colors: ['#C5D5E4', '#9FB4C7', '#7A8B99', '#E8EFF5', '#4A5D6B'],
      theme: 'The Stargazer',
      description: 'You find peace in the vastness of the night sky. Your palette captures the quiet beauty of moonlight and distant stars. You create spaces that feel contemplative and infinite, perfect for dreaming and deep thought.',
      traits: ['Contemplative', 'Dreamy', 'Wise', 'Peaceful']
    },
    'celestial-vibrant': {
      name: 'Aurora Borealis',
      colors: ['#1B4965', '#62B6CB', '#5FA8D3', '#CAE9FF', '#BEE9E8'],
      theme: 'The Wonder Seeker',
      description: 'You are captivated by the magic of the cosmos—dancing auroras, shooting stars, the play of light in darkness. Your palette shimmers with celestial energy. You create spaces that inspire awe and curiosity.',
      traits: ['Curious', 'Inspired', 'Magical', 'Wonder-filled']
    }
  };

  const getProfile = () => {
    const env = answers.environment || 'nature';
    const mood = answers.emotion || 'peaceful';
    
    const moodMap = {
      'peaceful': 'peaceful',
      'vibrant': 'vibrant',
      'elegant': 'elegant',
      'joyful': 'vibrant'
    };
    
    const mappedMood = moodMap[mood] || 'peaceful';
    const key = `${env}-${mappedMood}`;
    
    return paletteProfiles[key] || paletteProfiles['nature-peaceful'];
  };

  const handleAnswer = (questionId, value) => {
    setIsTransitioning(true);
    setAnswers({ ...answers, [questionId]: value });
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const resetQuiz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
      setIsTransitioning(false);
    }, 300);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const profile = getProfile();
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')"
        }}></div>
        
        <div className={`max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{profile.name}</h1>
            <p className="text-xl text-gray-600 italic">{profile.theme}</p>
          </div>

          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {profile.colors.map((color, idx) => (
              <div
                key={idx}
                className="group relative"
              >
                <div
                  className="w-20 h-20 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {color}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <p className="text-gray-800 text-lg leading-relaxed mb-6">
              {profile.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {profile.traits.map((trait, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm border border-gray-300"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            Discover Another Palette
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ci8+PC9nPjwvZz48L3N2Zz4=')"
      }}></div>
      
      <div className={`max-w-2xl w-full transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-gray-600 text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                className="w-full group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 bg-gray-50 hover:bg-gray-900 border border-gray-200 hover:border-gray-900"
              >
                <div className="relative px-6 py-5 flex items-center justify-between">
                  <span className="text-gray-900 group-hover:text-white font-semibold text-lg transition-colors duration-300">
                    {option.text}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Choose the option that resonates most deeply with you
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteQuiz;