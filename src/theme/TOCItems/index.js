/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo } from "react"
import {
  useThemeConfig,
  useTOCFilter,
  useTOCHighlight,
} from "@docusaurus/theme-common" // Recursive component rendering the toc tree

/* eslint-disable jsx-a11y/control-has-associated-label */

function TOCItemList({ toc, className, linkClassName, isChild }) {
  // Hide TOC if it contains fewer than 2 items
  if (!toc.length || toc.length < 2) {
    return null
  }

  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={linkClassName ?? undefined} // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: heading.value,
            }}
          />
          <TOCItemList
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  )
}

export default function TOCItems({
  toc,
  className = "table-of-contents table-of-contents__left-border",
  linkClassName = "table-of-contents__link",
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}) {
  const themeConfig = useThemeConfig()
  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel
  const tocFiltered = useTOCFilter({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  })
  const tocHighlightConfig = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      }
    }

    return undefined
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel])
  useTOCHighlight(tocHighlightConfig)
  return (
    <TOCItemList
      toc={tocFiltered}
      className={className}
      linkClassName={linkClassName}
      {...props}
    />
  )
}
