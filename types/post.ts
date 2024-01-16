import { Integer, Tripcode, DateString, Id, Capcode, CountryCode, FileExtension, Md5, Since4Pass } from "./primitives.d.ts";

export interface BasicPost {
    no: Integer;
    resto: Integer;
    now: DateString;
    time: Integer;
    name: string;
    trip?: Tripcode;
    com?: string;
    since4pass?: Since4Pass;
};

export interface CapcodePost extends BasicPost {
    id: Id;
    capcode: Capcode;
};

export interface CountryPost extends BasicPost {
    country: CountryCode;
    country_name: string;
    board_flag: string;
};

export interface AttachmentPost extends BasicPost {
    tim: Integer;
    ext: FileExtension;
    fsize: Integer;
    md5: Md5;
    w: Integer;
    h: Integer;
    tn_w: Integer;
    tn_h: Integer;
};

export interface SpoilerAttachmentPost extends AttachmentPost {
    spoiler: 1;
    custom_spoiler?: Integer;
};

export interface MobileOptimizedImagePost extends AttachmentPost {
    m_img: Integer;
};

export interface DeletedAttachmentPost extends BasicPost {
    filedeleted: 1;
};

export type Post = BasicPost | CapcodePost | CountryPost | AttachmentPost | SpoilerAttachmentPost | MobileOptimizedImagePost | DeletedAttachmentPost;

export interface BasicOriginalPost extends BasicPost {
    sub?: string;
    replies: Integer;
    images: Integer;
    bumplimit?: 1;
    imagelimit?: 1;
    semantic_url: string;
    unique_ips: Integer;
};

export interface FlashOriginalPost extends BasicOriginalPost {
    tag: string;
};

export interface ArchivedOriginalPost extends BasicOriginalPost {
    archived: 1;
    archived_on: Integer;
};

export type OriginalPost = BasicOriginalPost | FlashOriginalPost | ArchivedOriginalPost;
