javascript

Confusion Matrix

# Use print(var) or cat("Messages...") to debug your solution.

compute_recall <- function(m) {
    m$true_positive / (m$true_positive + m$false_negative)
}

compute_precision <- function(m) {
    m$true_positive / (m$true_positive + m$false_positive)
}

compute_specificity <- function(m) {
    m$true_negative / (m$true_negative + m$false_positive)
}

compute_accuracy <- function(m) {
    (m$true_positive + m$true_negative) / (m$true_positive + m$false_positive + m$false_negative + m$true_negative)
    
}

test::
m <- list(true_positive = 30, true_negative = 60, false_positive = 10, false_negative = 20)

recall <- compute_recall(m)
precision <- compute_precision(m)
specificity <- compute_specificity(m)
accuracy <- compute_accuracy(m)
cat(sprintf("Recall: %f, Precision %f, Specificity: %f, Accuracy: %f\n", recall, precision, specificity, accuracy))






TF-IDF

# Generated from function body. Editing this file has no effect.
function (..., row.names = NULL, check.rows = FALSE, check.names = TRUE, 
    fix.empty.names = TRUE, stringsAsFactors = default.stringsAsFactors()) 
{
    data.row.names <- if (check.rows && is.null(row.names)) 
        function(current, new, i) {
            if (is.character(current)) 
                new <- as.character(new)
            if (is.character(new)) 
                current <- as.character(current)
            if (anyDuplicated(new)) 
                return(current)
            if (is.null(current)) 
                return(new)
            if (all(current == new) || all(current == "")) 
                return(new)
            stop(gettextf("mismatch of row names in arguments of 'data.frame', item %d", 
                i), domain = NA)
        }
    else function(current, new, i) {
        if (is.null(current)) {
            if (anyDuplicated(new)) {
                warning(gettextf("some row.names duplicated: %s --> row.names NOT used", 
                  paste(which(duplicated(new)), collapse = ",")), 
                  domain = NA)
                current
            }
            else new
        }
        else current
    }
    object <- as.list(substitute(list(...)))[-1L]
    mirn <- missing(row.names)
    mrn <- is.null(row.names)
    x <- list(...)
    n <- length(x)
    if (n < 1L) {
        if (!mrn) {
            if (is.object(row.names) || !is.integer(row.names)) 
                row.names <- as.character(row.names)
            if (anyNA(row.names)) 
                stop("row names contain missing values")
            if (anyDuplicated(row.names)) 
                stop(gettextf("duplicate row.names: %s", paste(unique(row.names[duplicated(row.names)]), 
                  collapse = ", ")), domain = NA)
        }
        else row.names <- integer()
        return(structure(list(), names = character(), row.names = row.names, 
            class = "data.frame"))
    }
    vnames <- names(x)
    if (length(vnames) != n) 
        vnames <- character(n)
    no.vn <- !nzchar(vnames)
    vlist <- vnames <- as.list(vnames)
    nrows <- ncols <- integer(n)
    for (i in seq_len(n)) {
        xi <- if (is.character(x[[i]]) || is.list(x[[i]])) 
            as.data.frame(x[[i]], optional = TRUE, stringsAsFactors = stringsAsFactors)
        else as.data.frame(x[[i]], optional = TRUE)
        nrows[i] <- .row_names_info(xi)
        ncols[i] <- length(xi)
        namesi <- names(xi)
        if (ncols[i] > 1L) {
            if (length(namesi) == 0L) 
                namesi <- seq_len(ncols[i])
            vnames[[i]] <- if (no.vn[i]) 
                namesi
            else paste(vnames[[i]], namesi, sep = ".")
        }
        else if (length(namesi)) {
            vnames[[i]] <- namesi
        }
        else if (fix.empty.names && no.vn[[i]]) {
            tmpname <- deparse(object[[i]], nlines = 1L)[1L]
            if (substr(tmpname, 1L, 2L) == "I(") {
                ntmpn <- nchar(tmpname, "c")
                if (substr(tmpname, ntmpn, ntmpn) == ")") 
                  tmpname <- substr(tmpname, 3L, ntmpn - 1L)
            }
            vnames[[i]] <- tmpname
        }
        if (mirn && nrows[i] > 0L) {
            rowsi <- attr(xi, "row.names")
            if (any(nzchar(rowsi))) 
                row.names <- data.row.names(row.names, rowsi, 
                  i)
        }
        nrows[i] <- abs(nrows[i])
        vlist[[i]] <- xi
    }
    nr <- max(nrows)
    for (i in seq_len(n)[nrows < nr]) {
        xi <- vlist[[i]]
        if (nrows[i] > 0L && (nr%%nrows[i] == 0L)) {
            xi <- unclass(xi)
            fixed <- TRUE
            for (j in seq_along(xi)) {
                xi1 <- xi[[j]]
                if (is.vector(xi1) || is.factor(xi1)) 
                  xi[[j]] <- rep(xi1, length.out = nr)
                else if (is.character(xi1) && inherits(xi1, "AsIs")) 
                  xi[[j]] <- structure(rep(xi1, length.out = nr), 
                    class = class(xi1))
                else if (inherits(xi1, "Date") || inherits(xi1, 
                  "POSIXct")) 
                  xi[[j]] <- rep(xi1, length.out = nr)
                else {
                  fixed <- FALSE
                  break
                }
            }
            if (fixed) {
                vlist[[i]] <- xi
                next
            }
        }
        stop(gettextf("arguments imply differing number of rows: %s", 
            paste(unique(nrows), collapse = ", ")), domain = NA)
    }
    value <- unlist(vlist, recursive = FALSE, use.names = FALSE)
    vnames <- unlist(vnames[ncols > 0L])
    if (fix.empty.names && any(noname <- !nzchar(vnames))) 
        vnames[noname] <- paste0("Var.", seq_along(vnames))[noname]
    if (check.names) {
        if (fix.empty.names) 
            vnames <- make.names(vnames, unique = TRUE)
        else {
            nz <- nzchar(vnames)
            vnames[nz] <- make.names(vnames[nz], unique = TRUE)
        }
    }
    names(value) <- vnames
    if (!mrn) {
        if (length(row.names) == 1L && nr != 1L) {
            if (is.character(row.names)) 
                row.names <- match(row.names, vnames, 0L)
            if (length(row.names) != 1L || row.names < 1L || 
                row.names > length(vnames)) 
                stop("'row.names' should specify one of the variables")
            i <- row.names
            row.names <- value[[i]]
            value <- value[-i]
        }
        else if (!is.null(row.names) && length(row.names) != 
            nr) 
            stop("row names supplied are of the wrong length")
    }
    else if (!is.null(row.names) && length(row.names) != nr) {
        warning("row names were found from a short variable and have been discarded")
        row.names <- NULL
    }
    class(value) <- "data.frame"
    if (is.null(row.names)) 
        attr(value, "row.names") <- .set_row_names(nr)
    else {
        if (is.object(row.names) || !is.integer(row.names)) 
            row.names <- as.character(row.names)
        if (anyNA(row.names)) 
            stop("row names contain missing values")
        if (anyDuplicated(row.names)) 
            stop(gettextf("duplicate row.names: %s", paste(unique(row.names[duplicated(row.names)]), 
                collapse = ", ")), domain = NA)
        row.names(value) <- row.names
    }
    value
}



# Use print(var) or cat("Messages...") to debug your solution.

stop_words <- stopwords::stopwords("en")

find_frequent_words <- function(sentence) {

    data.frame(word = character(), frequency = numeric())
}



example <- "neural network deep neural network deep learning network"
sentence <- "Repeating a word, any word in English is incorrect syntactically."

print(find_frequent_words(example)) # ('deep', 0.250), ('learning', 0.125), ('network', 0.375), ('neural', 0.250)
print(find_frequent_words(sentence))