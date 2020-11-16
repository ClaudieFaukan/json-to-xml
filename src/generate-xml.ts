import { parse } from 'js2xmlparser';
import { IDeclarationOptions } from 'js2xmlparser/lib/options';


export interface GenerateXmlOptions {
    declaration?: IDeclarationOptions | boolean;
    pretty?: boolean;
}

export function generateXml <TObj extends object> ( obj: TObj, options?: GenerateXmlOptions): string {

    const keys  = Object.keys(obj) as (keyof TObj)[];

    const mainKey = keys[0];

    let declaration: IDeclarationOptions | undefined;
    const pretty = options && options.pretty || false;

    if(options) {

        declaration = typeof options.declaration === 'boolean' ? {
            include: options.declaration
        } : options.declaration;
    }

    return parse(mainKey as string, obj[mainKey], {
        attributeString: '__attributes',
        declaration: declaration,
        format: {
            doubleQuotes: true,
            pretty: pretty
        }
    });
}