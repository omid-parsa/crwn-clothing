import React, {Component} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import { selectSections } from '../../redux/directory/directory.selectors';

import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

const Directory = ({sections})=> {    
        return(
                <div className='directory-menu'>
                    {
                        /* the following code is one way without destructuring
                        
                        this.state.sections.map( section => (           
                            <MenuItem key={section.id} title={section.title}/>
                        ) )
                        */
                      // this followning way is with destructuring
                      sections.map( ({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps}/>
                      ) )
                    }
                </div>
              )    
}
const mapStateToProps = createStructuredSelector({
  sections: selectSections
});
export default connect(mapStateToProps)(Directory);