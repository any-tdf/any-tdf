import { redirect } from '@sveltejs/kit';

export const load = () => redirect(308, '/generator');
