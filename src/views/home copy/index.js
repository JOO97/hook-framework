import { createHookInstance } from '@/core/runtime/create-app';
import hook from './module/index';
import '@/assets/public.css';
import '@/assets/public2.css';

// if (!stage);
// useInit(stage);
createHookInstance(hook);
