-- Subcategory tiles showed an emoji via "icon"; they now show an uploaded
-- image. "icon" is deliberately left in place rather than dropped: 45 of 53
-- subcategories still carry one, and keeping the column means the tiles can be
-- reverted without data loss. It can be dropped once the images are in.

ALTER TABLE "Subcategory" ADD COLUMN "imageUrl" TEXT;
