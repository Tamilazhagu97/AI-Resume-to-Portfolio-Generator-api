import {
    swissMinimal,
    brutalistNeoBrutalism,
    terminalHacker,
    magazineLayout,
    bentoGrid,
    glassmorphism,
    newspaperVictorian,
    neonCyberpunk,
    polaroidScrapbook,
    futuristic3D
} from '../src/templates';
import exampleResume from '../examples/sampleData';

describe('Template Functions', () => {
    const themes = [
        { name: 'swissMinimal', func: swissMinimal },
        { name: 'brutalistNeoBrutalism', func: brutalistNeoBrutalism },
        { name: 'terminalHacker', func: terminalHacker },
        { name: 'magazineLayout', func: magazineLayout },
        { name: 'bentoGrid', func: bentoGrid },
        { name: 'glassmorphism', func: glassmorphism },
        { name: 'newspaperVictorian', func: newspaperVictorian },
        { name: 'neonCyberpunk', func: neonCyberpunk },
        { name: 'polaroidScrapbook', func: polaroidScrapbook },
        { name: 'futuristic3D', func: futuristic3D }
    ];

    themes.forEach(({ name, func }) => {
        describe(name, () => {
            it('should return a string', () => {
                const result = func(exampleResume);
                expect(typeof result).toBe('string');
            });

            it('should contain <!DOCTYPE html>', () => {
                const result = func(exampleResume);
                expect(result).toContain('<!DOCTYPE html>');
            });

            it('should contain the fullName', () => {
                const result = func(exampleResume);
                expect(result).toContain(exampleResume.fullName);
            });
        });
    });
});
