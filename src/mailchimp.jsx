'use strict';

import React from 'react';
import ClassNames from 'classnames';
import config from './config.json';


if(!config || !config.mailChimpUser || !config.mailChimpId) console.error("MAIL_CHIMP_USER and MAIL_CHIMP_ID not set in the environment, proceeding anyway");

export default class MailChimpForm extends React.Component {
    render() {
        return (
      <div>
        {/* Begin MailChimp Signup Form */}
        <link href="http://cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
        <style type="text/css" dangerouslySetInnerHTML={{__html: "\n\t#mc_embed_signup{background:#fff; clear:left;}\n\t#mc_embed_signup .button{background-color: #7030a0;}\n\t#mc_embed_signup .button:hover{background-color: #b553ff;}\n\t/* Add your own MailChimp form style overrides in your site stylesheet or in this style block.\n\t   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n" }} />
        <div id="mc_embed_signup">
          <form action={"http://herokuapp.us16.list-manage.com/subscribe/post?u="+config.mailChimpUser+"&id="+config.mailChimpId} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span>
                </label>
                <input type="email" placeholder="you@youremail.com" name="EMAIL" className="required email" id="mce-EMAIL" />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-FNAME">First Name </label>
                <input type="text" placeholder="First Name" name="FNAME" className id="mce-FNAME" />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-LNAME">Last Name </label>
                <input type="text" placeholder="Last Name" name="LNAME" className id="mce-LNAME" />
              </div>
              <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response" style={{display: 'none'}} />
                <div className="response" id="mce-success-response" style={{display: 'none'}} />
              </div>    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
              <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name={"b_"+config.mailChimpUser+"_"+config.mailChimpId} tabIndex={-1} defaultValue /></div>
              <div className="clear"><input type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
            </div>
          </form>
        </div>
        {/*End mc_embed_signup*/}
      </div>
    );
    }
}
