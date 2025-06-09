declare module 'papaparse' {
    namespace PapaParse {
        interface ParseError {
            message: string;
            row?: number;
        }

        interface ParseRow {
            data: string[];
        }

        interface Parser {
            abort(): void;
        }

        interface LocalParseResult {
            data: string[][];
            errors: ParseError[];
        }

        const Papa: {
            parse: (
                input: File | string,
                options: {
                    complete?: (result: LocalParseResult) => void;
                    error?: (error: ParseError) => void;
                    step?: (row: ParseRow, parser: Parser) => void;
                    skipEmptyLines?: boolean;
                    delimiter?: string;
                    header?: boolean;
                    dynamicTyping?: boolean;
                    preview?: number;
                }
            ) => void;
        };
    }

    export = PapaParse.Papa;
}