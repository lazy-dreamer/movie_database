import React from "react";
import {Link} from "react-router-dom";
import styles from './error_page.module.scss'

export function ErrorPage() {
  return <section>
    <div className="screen_content">
      <div className={styles.error_msg}>
        <div className="error_msg_image">
          <img src="/error_page_cover.jpg" alt="error_page_cover"/>
        </div>
        <div className="text_center">
          <Link to="/">Go to main page</Link>
        </div>
      </div>
    </div>
  </section>;
}