import {expect} from 'chai';
import { generateXml } from '../src/generate-xml';


describe('testXml', ( () => {

    it('generateXml', () => { 

        const node: Object = {
            note :{
                to : 'Tove',
                from : 'Jani'
            }
        };
        
        const xml = generateXml(node,{
            declaration :{
                include : false,
            }
        });

        expect(xml).to.eq('<note><to>Tove</to><from>Jani</from></note>');

    });
   

    it('generateXml avec attributs', ()=> {
        
        const node: Object = {
            note :{
                '__attributes': {
                    'version' : '1.0.1'
                },
                to: 'Tove', 
                from: 'Jani'   
            }
        };   
            
    
        const xml = generateXml(node, {
            declaration :{
                include : false,
            }
        });

        expect(xml).to.eq(`<note version="1.0.1"><to>Tove</to><from>Jani</from></note>`);

    })
 
    
    it('generateXml avec attributs recursive', ()=> {
        
        const node: Object = {
            note : {
                '__attributes' : {
                    'Version' : '1.0.1.1'
                },
                to: 'Tove', 
                from: {
                    to: 'Tove',
                    from:{
                        to: 'Tove',
                        from:'Jani'
                    }
                }
            }
        };
 
        const xml = generateXml(node,{
            declaration :{
                include : false,
            }
        });

        expect(xml).to.eq(`<note Version="1.0.1.1"><to>Tove</to><from><to>Tove</to><from><to>Tove</to><from>Jani</from></from></from></note>`);

    });


    it('generateXml avec attributs recursive avec numerique sans declaration (object)', ()=> {
        
        const node: Object = {
            note : {
                '__attributes' : {
                        'Version' : '1.0.1.1'
                },
                to: 'Tove', 
                from: {
                    to: 'Tove',
                    from:{
                        to: 'Tove',
                        from: 202
                    }
                }
            }
        };

        const xml = generateXml(node, {
            declaration :{
                include : false,
            }
        });

         expect(xml).to.eq('<note Version="1.0.1.1"><to>Tove</to><from><to>Tove</to><from><to>Tove</to><from>202</from></from></from></note>');

    });


    it('generateXml avec attributs recursive avec boolean sans declaration (boolean)', ()=> {
        
        const node: Object = {
            note : {
                '__attributes' : {
                        'Version' : '1.0.1.1'
                    },
                to: 'Tove', 
                from: {
                    to: 'Tove',
                    from:{
                        to: 'Tove',
                        from: true
                    }
                } 
            }
        };

        const xml = generateXml(node,{
            declaration: false
        });

        expect(xml).to.eq('<note Version="1.0.1.1"><to>Tove</to><from><to>Tove</to><from><to>Tove</to><from>true</from></from></from></note>');

    });


    it('generateXml avec attributs recursive avec boolean + numerique', ()=> {
        
        const node: Object = {
            note : {
                '__attributes' : {
                    'Version' : '1.0.1.1'
                },
                to: 404, 
                from: {
                    to: 'Tove',
                    from:{
                        to: 'Tove',
                        from: true
                    }
                }
            }
        };

        const xml = generateXml(node);

        expect(xml).to.eq('<?xml version="1.0"?><note Version="1.0.1.1"><to>404</to><from><to>Tove</to><from><to>Tove</to><from>true</from></from></from></note>');

    });



    it('generateXml avec attributs recursive avec boolean + numerique en pretty', ()=> {
        
        const node: Object = {
            note : {
                '__attributes' : {
                    'Version' : '1.0.1.1'
                },
                to: 404, 
                from: {
                    to: 'Tove',
                    from:{
                        to: 'Tove',
                        from: true
                    }
                }
            }
        };

        const xml = generateXml(node, {
            pretty: true
        });

        expect(xml).to.eq(`<?xml version="1.0"?>\n<note Version="1.0.1.1">\n    <to>404</to>\n    <from>\n        <to>Tove</to>\n        <from>\n            <to>Tove</to>\n            <from>true</from>\n        </from>\n    </from>\n</note>`);
    });
}));    

