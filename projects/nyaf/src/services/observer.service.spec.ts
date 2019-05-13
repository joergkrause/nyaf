import { Observer } from './observer.service';

test('can get Observer instance', () => {
	var os = Observer.getInstance();
	expect(os).not.toBeNull();
});

test('has config', () => {
	var result = Observer.getInstance().subscribe('TEST', () => void 0);
	expect(result).not.toBeUndefined();
	expect(result.remove).not.toBeUndefined();
});
