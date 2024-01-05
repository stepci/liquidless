import { describe, expect, test } from 'vitest';
import { defaultFilters, parseArgs } from '../src/filters';

describe('defaultFilters', () => {
    describe('upcase', () => {
        test('should convert a string to uppercase', () => {
            expect(defaultFilters.upcase('hello', [], '')).toBe('HELLO');
        });
    });

    describe('downcase', () => {
        test('should convert a string to lowercase', () => {
            expect(defaultFilters.downcase('HELLO', [], '')).toBe('hello');
        });
    });

    describe('capitalize', () => {
        test('should capitalize a string', () => {
            expect(defaultFilters.capitalize('hello world', [], '')).toBe('Hello world');
        });
    });

    describe('toInt', () => {
        test('should convert a string to an integer', () => {
            expect(defaultFilters.toInt('123.123', [], '')).toBe(123);
        });
    });

    describe('toFloat', () => {
        test('should convert a string to a float', () => {
            expect(defaultFilters.toFloat('123.123', [], '')).toBe(123.123);
        });
    });

    describe('toString', () => {
        test('should convert a value to a string', () => {
            expect(defaultFilters.toString(123.123, [], '')).toBe('123.123');
        });
    });
});

describe('parseArgs', () => {
    test('should parse filter arguments', () => {
        expect(parseArgs('1, 2')).toEqual([1, 2]);
        expect(parseArgs('"test", 2')).toEqual(['test', 2]);
        expect(parseArgs('\'test\', 2')).toEqual(['test', 2]);
    });

    test('should parse quoted strings', () => {
        expect(parseArgs('"test"')).toEqual(['test']);
        expect(parseArgs('\'test\'')).toEqual(['test']);
    });

    test('should parse numbers', () => {
        expect(parseArgs('1, 2')).toEqual([1, 2]);
        expect(parseArgs('1.1, 2.2')).toEqual([1.1, 2.2]);
    });

    test('should parse booleans', () => {
        expect(parseArgs('true, false')).toEqual([true, false]);
    });

    test('should parse null', () => {
        expect(parseArgs('null')).toEqual([null]);
    });
});
