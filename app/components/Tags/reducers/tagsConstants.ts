import { Tag } from '@customTypes/data';

export const TAG_INDEX_SUCCESS = 'TAG_INDEX_SUCCESS';
export const TAG_INDEX_FAILED = 'TAG_INDEX_FAILED';
export const TAG_POST_SUCCESS = 'TAG_POST_SUCCESS';
export const TAG_POST_FAILED = 'TAG_POST_FAILED';
export const TAG_UPDATE_SUCCESS = 'TAG_UPDATE_SUCCESS';
export const TAG_UPDATE_FAILED = 'TAG_UPDATE_FAILED';
export const TAG_DELETE_SUCCESS = 'TAG_DELETE_SUCCESS';
export const TAG_DELETE_FAILED = 'TAG_DELETE_FAILED';
export const CHANGE_TAGS_ACTIVE = 'CHANGE_TAGS_ACTIVE';

export interface TagIndexSuccess {
    type: typeof TAG_INDEX_SUCCESS
    tags: Tag[]
}

export interface TagIndexFailed {
    type: typeof TAG_INDEX_FAILED,
    message: string
}

export interface TagPostSuccess {
    type: typeof TAG_POST_SUCCESS,
    tag: Tag
}

export interface TagPostFailed {
    type: typeof TAG_POST_FAILED,
    message: string
}

export interface TagUpdateSuccess {
    type: typeof TAG_UPDATE_SUCCESS,
    tag: Tag
}

export interface TagUpdateFailed {
    type: typeof TAG_UPDATE_FAILED,
    message: string
}

export interface TagDeleteSuccess {
    type: typeof TAG_DELETE_SUCCESS,
    id: number
}

export interface TagDeleteFailed {
    type: typeof TAG_DELETE_FAILED,
    message: string
}

export interface ChangeTagsActive {
    type: typeof CHANGE_TAGS_ACTIVE,
    tag: Tag
}

export type TagActions =
TagIndexSuccess |
TagIndexFailed |
TagPostSuccess |
TagPostFailed |
TagUpdateSuccess |
TagUpdateFailed |
TagDeleteSuccess |
TagDeleteFailed |
ChangeTagsActive
