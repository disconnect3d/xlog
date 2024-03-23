import './style.css';
import Theme from './Theme';

import { useState } from 'react'

import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import {
    $convertFromMarkdownString,
    $convertToMarkdownString,
    TRANSFORMERS,
} from '@lexical/markdown';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';

import {
    HeadingNode,
    QuoteNode,
    registerRichText,
} from '@lexical/rich-text';
import {CodeNode} from '@lexical/code';
import {ListNode, ListItemNode} from '@lexical/list';
import {LinkNode} from '@lexical/link';
import {
    TableNode,
    TableCellNode,
    TableRowNode,
} from '@lexical/table';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';

import ToolbarPlugin from './plugins/ToolbarPlugin';



function onError(error) {
    console.error(error);
}

export default function Editor() {
    return (
        <LexicalComposer initialConfig={{
            namespace: 'mdeditor',
            nodes: [
                HeadingNode,
                QuoteNode,
                CodeNode,
                ListNode,
                ListItemNode,
                LinkNode,
                TableNode,
                TableCellNode,
                TableRowNode,
            ],
            theme: Theme,
            onError,
        }}>
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TablePlugin />
          <LinkPlugin />
          <TabIndentationPlugin />
        </LexicalComposer>
    );
}
